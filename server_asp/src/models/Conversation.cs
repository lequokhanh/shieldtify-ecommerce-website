using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Conversation
{
    public Guid Uid { get; set; }

    public Guid Clientid { get; set; }

    public Guid Staffid { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ClientAccount Client { get; set; } = null!;

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual Account Staff { get; set; } = null!;
}
