using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class ItemCategory
{
    public Guid Uid { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();
}
