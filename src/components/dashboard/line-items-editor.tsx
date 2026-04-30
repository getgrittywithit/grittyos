'use client';

import * as React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/lib/demo-data';
import type { LineItem } from '@/types/crm';

interface LineItemsEditorProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  taxRate?: number;
  onTaxRateChange?: (rate: number) => void;
  readOnly?: boolean;
}

function generateId() {
  return `li-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function LineItemsEditor({
  items,
  onChange,
  taxRate = 0.0825,
  onTaxRateChange,
  readOnly = false,
}: LineItemsEditorProps) {
  const addItem = () => {
    const newItem: LineItem = {
      id: generateId(),
      description: '',
      quantity: 1,
      unit_price: 0,
      total: 0,
    };
    onChange([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    const updatedItems = items.map((item) => {
      if (item.id !== id) return item;

      const updated = { ...item, [field]: value };

      // Recalculate total when quantity or unit_price changes
      if (field === 'quantity' || field === 'unit_price') {
        updated.total = Number(updated.quantity) * Number(updated.unit_price);
      }

      return updated;
    });
    onChange(updatedItems);
  };

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="space-y-4">
      {/* Line Items */}
      <div className="space-y-3">
        {/* Header */}
        <div className="hidden grid-cols-12 gap-2 text-sm font-medium text-muted-foreground sm:grid">
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-right">Qty</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-1"></div>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-8 text-center">
            <p className="text-muted-foreground">No line items yet.</p>
            {!readOnly && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addItem}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            )}
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-start gap-2 rounded-lg border border-border p-3 sm:items-center sm:p-2"
            >
              {/* Description */}
              <div className="col-span-12 sm:col-span-5">
                <Label className="mb-1 block text-xs text-muted-foreground sm:hidden">
                  Description
                </Label>
                {readOnly ? (
                  <p className="text-sm">{item.description}</p>
                ) : (
                  <Input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, 'description', e.target.value)
                    }
                    placeholder="Item description"
                    className="h-8 text-sm"
                  />
                )}
              </div>

              {/* Quantity */}
              <div className="col-span-4 sm:col-span-2">
                <Label className="mb-1 block text-xs text-muted-foreground sm:hidden">
                  Qty
                </Label>
                {readOnly ? (
                  <p className="text-right text-sm">{item.quantity}</p>
                ) : (
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-right text-sm"
                  />
                )}
              </div>

              {/* Unit Price */}
              <div className="col-span-4 sm:col-span-2">
                <Label className="mb-1 block text-xs text-muted-foreground sm:hidden">
                  Price
                </Label>
                {readOnly ? (
                  <p className="text-right text-sm">{formatCurrency(item.unit_price)}</p>
                ) : (
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) =>
                      updateItem(item.id, 'unit_price', parseFloat(e.target.value) || 0)
                    }
                    className="h-8 text-right text-sm"
                  />
                )}
              </div>

              {/* Total */}
              <div className="col-span-3 sm:col-span-2">
                <Label className="mb-1 block text-xs text-muted-foreground sm:hidden">
                  Total
                </Label>
                <p className="text-right text-sm font-medium">
                  {formatCurrency(item.total)}
                </p>
              </div>

              {/* Remove */}
              <div className="col-span-1 flex justify-end">
                {!readOnly && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}

        {/* Add Item Button */}
        {!readOnly && items.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Line Item
          </Button>
        )}
      </div>

      {/* Totals */}
      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-muted-foreground">
              Tax
              {!readOnly && onTaxRateChange ? (
                <span className="flex items-center gap-1">
                  (
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={(taxRate * 100).toFixed(2)}
                    onChange={(e) =>
                      onTaxRateChange(parseFloat(e.target.value) / 100 || 0)
                    }
                    className="h-6 w-14 px-1 text-center text-xs"
                  />
                  %)
                </span>
              ) : (
                <span>({(taxRate * 100).toFixed(2)}%)</span>
              )}
            </span>
            <span className="font-medium">{formatCurrency(taxAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Read-only version for displaying invoices/quotes
export function LineItemsDisplay({
  items,
  subtotal,
  taxRate,
  taxAmount,
  total,
}: {
  items: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}) {
  return (
    <div className="space-y-4">
      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-2 text-left font-medium text-muted-foreground">
                Description
              </th>
              <th className="pb-2 text-right font-medium text-muted-foreground">
                Qty
              </th>
              <th className="pb-2 text-right font-medium text-muted-foreground">
                Price
              </th>
              <th className="pb-2 text-right font-medium text-muted-foreground">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/50">
                <td className="py-3">{item.description}</td>
                <td className="py-3 text-right">{item.quantity}</td>
                <td className="py-3 text-right">{formatCurrency(item.unit_price)}</td>
                <td className="py-3 text-right font-medium">
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="ml-auto max-w-xs space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Tax ({(taxRate * 100).toFixed(2)}%)
          </span>
          <span>{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
