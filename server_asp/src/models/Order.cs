using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Order
{
    public Guid Uid { get; set; }

    public Guid Clientid { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string ReceiveMethod { get; set; } = null!;

    public Guid ShippingAddressid { get; set; }

    public DateTime OrderDate { get; set; }

    public string OrderStatus { get; set; } = null!;

    public Guid SupportedBy { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public string PromotionCode { get; set; } = null!;

    public virtual ClientAccount Client { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual ClientAddress ShippingAddress { get; set; } = null!;

    public virtual Account SupportedByNavigation { get; set; } = null!;
}
