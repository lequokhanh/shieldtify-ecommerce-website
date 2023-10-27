using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Message
{
    public Guid Uid { get; set; }

    public Guid Conversationid { get; set; }

    public string Content { get; set; } = null!;

    public string Role { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual Conversation Conversation { get; set; } = null!;
}
