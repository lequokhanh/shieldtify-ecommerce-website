using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class Post
{
    public Guid Uid { get; set; }

    public string? Title { get; set; }

    public string Content { get; set; } = null!;

    public int Depth { get; set; }

    public string? KeyWords { get; set; }

    public sbyte IsEdited { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? ParentPost { get; set; }

    public virtual ClientAccount? CreatedByNavigation { get; set; }

    public virtual ICollection<Post> ChildrenPosts { get; set; } = new List<Post>();

    public virtual ICollection<Vote> Votes { get; set; } = new List<Vote>();
}
