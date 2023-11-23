using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Promotion
{
    public string Code { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Condition { get; set; } = null!;

    public float DiscountRate { get; set; }

    public float MaxDiscount { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
