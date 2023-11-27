using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class CartItem
{
    public Guid Clientid { get; set; }

    public Guid Itemid { get; set; }

    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }


    public virtual ClientAccount Client { get; set; } = null!;

    public virtual Item Item { get; set; } = null!;
}
