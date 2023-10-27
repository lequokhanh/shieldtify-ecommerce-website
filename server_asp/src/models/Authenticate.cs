using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Authenticate
{
    public Guid Uid { get; set; }

    public string UsedTo { get; set; } = null!;

    public string Token { get; set; } = null!;

    public bool IsUsed { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
