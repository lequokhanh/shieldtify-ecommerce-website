using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Vote
{
    public Guid Postid { get; set; }

    public Guid Clientid { get; set; }

    public string Type { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }


    public virtual ClientAccount Client { get; set; } = null!;

    public virtual Post Post { get; set; } = null!;
}
