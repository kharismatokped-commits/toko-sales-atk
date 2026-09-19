import React from 'react';
import { useToast } from '../../lib/context/toast-context';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => {
        const Icon = toast.type === 'success' ? CheckCircle : toast.type === 'error' ? AlertCircle : Info;
        const bgClasses = {
          success: 'bg-green-50 border-green-200 text-green-800',
          error: 'bg-red-50 border-red-200 text-red-800',
          info: 'bg-blue-50 border-blue-200 text-blue-800',
        };
        const iconClasses = {
          success: 'text-green-500',
          error: 'text-red-500',
          info: 'text-blue-500',
        };

        return (
          <div
            key={toast.id}
            className={`flex items-center p-4 border rounded-lg shadow-lg ${bgClasses[toast.type]} min-w-[300px]`}
          >
            <Icon className={`w-5 h-5 mr-3 ${iconClasses[toast.type]}`} />
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
