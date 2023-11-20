﻿using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Brand
{
    public Guid Uid { get; set; }

    public string Name { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Item> Items { get; set; } = new List<Item>();
}
