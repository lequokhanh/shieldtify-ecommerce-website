using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class ItemImg
{
    public Guid Uid { get; set; }

    public Guid Itemid { get; set; }

    public string Link { get; set; } = null!;

    public bool IsPrimary { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }


    public virtual Item Item { get; set; } = null!;
}
