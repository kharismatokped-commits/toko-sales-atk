'use client'

import React, { createContext, useContext, useState } from 'react'
import { Produk, Transaksi, Pelanggan, Pembelian, SalesVisit, Prospek, Supplier, Wilayah, User, Piutang } from '@/lib/types'
import { mockProduk, mockTransaksi, mockPelanggan, mockPembelian, mockSalesVisit, mockProspek, mockSuppliers, mockWilayah, mockUsers, mockPiutang } from '@/lib/mock/data'

interface StoreContextType {
  products: Produk[]
  setProducts: React.Dispatch<React.SetStateAction<Produk[]>>
  transaksi: Transaksi[]
  setTransaksi: React.Dispatch<React.SetStateAction<Transaksi[]>>
  pelanggan: Pelanggan[]
  setPelanggan: React.Dispatch<React.SetStateAction<Pelanggan[]>>
  pembelian: Pembelian[]
  setPembelian: React.Dispatch<React.SetStateAction<Pembelian[]>>
  salesVisit: SalesVisit[]
  setSalesVisit: React.Dispatch<React.SetStateAction<SalesVisit[]>>
  prospek: Prospek[]
  setProspek: React.Dispatch<React.SetStateAction<Prospek[]>>
  suppliers: Supplier[]
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>
  wilayah: Wilayah[]
  setWilayah: React.Dispatch<React.SetStateAction<Wilayah[]>>
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  piutang: Piutang[]
  setPiutang: React.Dispatch<React.SetStateAction<Piutang[]>>
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Produk[]>(mockProduk)
  const [transaksi, setTransaksi] = useState<Transaksi[]>(mockTransaksi)
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>(mockPelanggan)
  const [pembelian, setPembelian] = useState<Pembelian[]>(mockPembelian)
  const [salesVisit, setSalesVisit] = useState<SalesVisit[]>(mockSalesVisit)
  const [prospek, setProspek] = useState<Prospek[]>(mockProspek)
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [wilayah, setWilayah] = useState<Wilayah[]>(mockWilayah)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [piutang, setPiutang] = useState<Piutang[]>(mockPiutang)

  return (
    <StoreContext.Provider
      value={{
        products, setProducts,
        transaksi, setTransaksi,
        pelanggan, setPelanggan,
        pembelian, setPembelian,
        salesVisit, setSalesVisit,
        prospek, setProspek,
        suppliers, setSuppliers,
        wilayah, setWilayah,
        users, setUsers,
        piutang, setPiutang,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
