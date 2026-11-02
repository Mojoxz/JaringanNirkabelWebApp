import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      {...{ closedby: 'any' }}
      className="backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs bg-transparent p-4 m-auto w-full max-w-xl open:flex items-center justify-center focus:outline-none"
    >
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-[88dvh] w-full flex flex-col text-slate-900 dark:text-slate-100">
          <div className="flex justify-between items-center px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
            <h2 className="font-bold text-base text-slate-900 dark:text-white">{title}</h2>
            <form method="dialog">
              <button
                type="submit"
                onClick={onClose}
                aria-label="Tutup dialog detail"
                className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
          <div className="p-5 sm:p-6 overflow-y-auto">{children}</div>
        </div>
      )}
    </dialog>
  );
}
