"use client";

export function DeliveryOptions() {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-display text-forest mb-4">Delivery Method</h3>
      <div className="space-y-4">
        <label className="flex items-center justify-between p-4 border border-terracotta bg-terracotta/5 rounded-xl cursor-pointer">
          <div className="flex items-center gap-3">
            <input type="radio" name="delivery" defaultChecked className="text-terracotta focus:ring-terracotta h-4 w-4" />
            <div>
              <div className="font-medium text-forest">Standard Shipping</div>
              <div className="text-xs text-slate">3-5 business days</div>
            </div>
          </div>
          <span className="font-medium text-forest">$5.00</span>
        </label>
        
        <label className="flex items-center justify-between p-4 border border-sand hover:border-forest/30 rounded-xl cursor-pointer transition-colors">
          <div className="flex items-center gap-3">
            <input type="radio" name="delivery" className="text-terracotta focus:ring-terracotta h-4 w-4" />
            <div>
              <div className="font-medium text-forest">Express Shipping</div>
              <div className="text-xs text-slate">1-2 business days</div>
            </div>
          </div>
          <span className="font-medium text-forest">$12.00</span>
        </label>
      </div>
    </div>
  );
}
