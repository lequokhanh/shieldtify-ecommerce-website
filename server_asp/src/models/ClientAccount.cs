using System;
using System.Collections.Generic;

namespace shieldtify.models;

public partial class ClientAccount
{
    public Guid Uid { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime? ChangedPasswordAt { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }


    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual ICollection<ClientAddress> ClientAddresses { get; set; } = new List<ClientAddress>();

    public virtual ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

    public virtual ICollection<Vote> Votes { get; set; } = new List<Vote>();
}
