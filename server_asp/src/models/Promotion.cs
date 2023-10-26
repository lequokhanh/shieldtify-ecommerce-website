using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Promotion
{
    public Guid Uid { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public float DiscountRate { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<PromotionItem> PromotionItems { get; set; } = new List<PromotionItem>();
}
