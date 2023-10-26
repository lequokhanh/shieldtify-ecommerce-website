using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class PromotionItem
{
    public Guid Promotionid { get; set; }

    public Guid Itemid { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Item Item { get; set; } = null!;

    public virtual Promotion Promotion { get; set; } = null!;
}
