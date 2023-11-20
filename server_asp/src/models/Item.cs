using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Item
{
    public Guid Uid { get; set; }

    public Guid Categoryid { get; set; }

    public Guid Brandid { get; set; }

    public string Name { get; set; } = null!;

    public string Specification { get; set; } = null!;

    public string Description { get; set; } = null!;

    public float Price { get; set; }

    public int StockQty { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ItemCategory Category { get; set; } = null!;

    public virtual ICollection<ItemImg> ItemImgs { get; set; } = new List<ItemImg>();

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
