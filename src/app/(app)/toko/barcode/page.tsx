'use client'

import { useState } from 'react'
import { useStore } from '@/lib/context/store-context'
import { formatRupiah } from '@/lib/utils'
import { Produk } from '@/lib/types'
import { Printer, Search, Check, RefreshCw, Barcode as BarcodeIcon, Tag, SlidersHorizontal, Eye } from 'lucide-react'

// Helper komponen SVG Barcode sederhana Code128 simulation yang tajam & scalable untuk print
function BarcodeSvg({ value }: { value: string }) {
  // Generate deterministik garis berdasarkan string value
  const bars = []
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }

  // Pola garis vertikal
  const pattern = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 1, 3, 2, 1, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2]
  let currentX = 5
  
  return (
    <svg className="w-full h-10" viewBox="0 0 160 40" preserveAspectRatio="none">
      {/* Garis-garis barcode */}
      <rect x="0" y="0" width="160" height="40" fill="white" />
      {Array.from({ length: 38 }).map((_, idx) => {
        const width = ((Math.abs(hash * (idx + 1)) % 3) + 1)
        const space = ((Math.abs(hash * (idx + 7)) % 3) + 1)
        const x = currentX
        currentX += width + space
        if (x > 150) return null
        return (
          <rect
            key={idx}
            x={x}
            y={2}
            width={width}
            height={34}
            fill="#111827"
          />
        )
      })}
    </svg>
  )
}

export default function BarcodePrintPage() {
  const { products } = useStore()

  // Selection
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    products.slice(0, 6).map(p => p.id)
  )
  const [search, setSearch] = useState('')
  const [copiesPerItem, setCopiesPerItem] = useState<number>(3)

  // Label Configuration
  const [showStoreName, setShowStoreName] = useState(true)
  const [showPrice, setShowPrice] = useState(true)
  const [showGrosirPrice, setShowGrosirPrice] = useState(true)
  const [labelFormat, setLabelFormat] = useState<'standard' | 'shelving'>('standard')

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(prev => prev.filter(item => item !== id))
    } else {
      setSelectedProductIds(prev => [...prev, id])
    }
  }

  const handleSelectAll = () => {
    if (selectedProductIds.length === products.length) {
      setSelectedProductIds([])
    } else {
      setSelectedProductIds(products.map(p => p.id))
    }
  }

  // Filtered Products
  const filteredProducts = products.filter(p =>
    p.nama.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.kategori.toLowerCase().includes(search.toLowerCase())
  )

  const selectedProducts = products.filter(p => selectedProductIds.includes(p.id))

  // Total label to print
  const totalLabels = selectedProducts.length * copiesPerItem

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 0;
            margin: 0;
            background: white !important;
          }
          @page {
            size: auto;
            margin: 6mm;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
              iPOS 5 Pro Barcode Studio
            </span>
            <span className="text-xs text-gray-500 font-medium">Cetak Label Barcode & Price Tag ATK</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Cetak Barcode & Label Rak Produk</h1>
          <p className="text-sm text-gray-500">
            Generate dan cetak stiker barcode produk ATK untuk ditempel pada produk, box karton, atau rak display.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          disabled={selectedProducts.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Cetak {totalLabels} Label Barcode
        </button>
      </div>

      {/* Config & Selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Selector */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex flex-col h-[640px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              Pilih Produk ATK ({selectedProductIds.length} Dipilih)
            </h3>
            <button
              onClick={handleSelectAll}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              {selectedProductIds.length === products.length ? 'Lepas Semua' : 'Pilih Semua'}
            </button>
          </div>

          <div className="relative mb-3">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari SKU atau nama produk..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pr-1">
            {filteredProducts.map(product => {
              const isSelected = selectedProductIds.includes(product.id)
              return (
                <div
                  key={product.id}
                  onClick={() => handleToggleSelect(product.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/80 text-blue-950 font-medium' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-snug line-clamp-1">{product.nama}</p>
                      <p className="text-[11px] text-gray-400 font-mono">{product.sku} • {product.kategori}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-gray-800 flex-shrink-0 ml-2">
                    {formatRupiah(product.harga_jual)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Format Options & Print Preview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Settings Panel */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              Pengaturan Format Stiker & Price Tag
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Jumlah Copy per Produk</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5, 10].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCopiesPerItem(n)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        copiesPerItem === n
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {n}x
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Tipe Layout Stiker</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setLabelFormat('standard')}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      labelFormat === 'standard'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Stiker 3 Kolom
                  </button>
                  <button
                    type="button"
                    onClick={() => setLabelFormat('shelving')}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      labelFormat === 'shelving'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    Label Rak / Display
                  </button>
                </div>
              </div>
            </div>

            {/* Checkbox options */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100 text-xs font-medium text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showStoreName}
                  onChange={e => setShowStoreName(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Nama Toko (KHALIFA NIAGA)
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPrice}
                  onChange={e => setShowPrice(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Harga Eceran
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrosirPrice}
                  onChange={e => setShowGrosirPrice(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                Harga Grosir Bertingkat
              </label>
            </div>
          </div>

          {/* Print Preview Area */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-600" />
                Live Print Preview ({totalLabels} Stiker Ter-generate)
              </h3>
              <span className="text-xs text-gray-400 font-mono">Kertas: Standar Tom & Jerry A4 / Label Roll</span>
            </div>

            {selectedProducts.length === 0 ? (
              <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-xl">
                <BarcodeIcon className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-500">Belum ada produk yang dipilih</p>
                <p className="text-xs text-gray-400">Pilih beberapa produk di panel sebelah kiri untuk melihat preview label.</p>
              </div>
            ) : (
              <div
                id="print-area"
                className={`p-3 bg-gray-50 border border-gray-200 rounded-xl max-h-[460px] overflow-y-auto grid ${
                  labelFormat === 'standard' ? 'grid-cols-3 gap-2.5' : 'grid-cols-2 gap-3'
                }`}
              >
                {selectedProducts.flatMap(p =>
                  Array.from({ length: copiesPerItem }).map((_, idx) => (
                    <div
                      key={`${p.id}-${idx}`}
                      className="bg-white p-2.5 rounded-lg border border-gray-300 shadow-sm flex flex-col justify-between text-center print:border-black print:shadow-none break-inside-avoid"
                    >
                      {showStoreName && (
                        <p className="text-[10px] font-black uppercase text-blue-900 tracking-wider mb-0.5">
                          KHALIFA NIAGA
                        </p>
                      )}

                      <p className="text-xs font-bold text-gray-900 leading-tight line-clamp-1">
                        {p.nama}
                      </p>

                      <div className="my-1 px-1">
                        <BarcodeSvg value={p.sku} />
                        <p className="text-[10px] font-mono tracking-widest text-gray-600 font-bold mt-0.5">
                          {p.sku}
                        </p>
                      </div>

                      {showPrice && (
                        <div className="mt-1 pt-1 border-t border-gray-100 flex flex-col items-center">
                          <span className="text-sm font-black text-gray-900">
                            {formatRupiah(p.harga_jual)}
                          </span>
                          {showGrosirPrice && p.harga_grosir_1 && (
                            <span className="text-[9px] font-semibold text-emerald-700">
                              Grosir: {formatRupiah(p.harga_grosir_1)} (min {p.min_qty_grosir_1 || 3})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
