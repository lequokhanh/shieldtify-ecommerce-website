using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class OrderItem
{
    public Guid Itemid { get; set; }

    public Guid Orderid { get; set; }

    public int Quantity { get; set; }

    public int SalesPrice { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
