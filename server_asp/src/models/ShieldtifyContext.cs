using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace shieldtify.models;

public partial class ShieldtifyContext : DbContext
{
    public ShieldtifyContext()
    {
    }

    public ShieldtifyContext(DbContextOptions<ShieldtifyContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Authenticate> Authenticates { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<CartItem> CartItems { get; set; }

    public virtual DbSet<ClientAccount> ClientAccounts { get; set; }

    public virtual DbSet<ClientAddress> ClientAddresses { get; set; }

    public virtual DbSet<Conversation> Conversations { get; set; }

    public virtual DbSet<Item> Items { get; set; }

    public virtual DbSet<ItemCategory> ItemCategories { get; set; }

    public virtual DbSet<ItemImg> ItemImgs { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderItem> OrderItems { get; set; }

    public virtual DbSet<Post> Posts { get; set; }

    public virtual DbSet<Promotion> Promotions { get; set; }

    public virtual DbSet<Vote> Votes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySQL("Server=localhost;User ID=shieldtify_user;Password=shieldtify_password;Database=shieldtify");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("accounts");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.ChangedPasswordAt)
                .HasColumnType("datetime")
                .HasColumnName("changed_password_at");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(255)
                .HasColumnName("display_name");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasMaxLength(255)
                .HasColumnName("role");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Authenticate>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("authenticates");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.IsUsed).HasColumnName("is_used");
            entity.Property(e => e.Token)
                .HasMaxLength(255)
                .HasColumnName("token");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.UsedTo)
                .HasMaxLength(50)
                .HasColumnName("used_to");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("brands");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<CartItem>(entity =>
        {
            entity.HasKey(e => new { e.Clientid, e.Itemid }).HasName("PRIMARY");

            entity.ToTable("cart_items");

            entity.HasIndex(e => e.Itemid, "itemid");

            entity.Property(e => e.Clientid).HasColumnName("clientid");
            entity.Property(e => e.Itemid).HasColumnName("itemid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Client).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.Clientid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_items_ibfk_1");

            entity.HasOne(d => d.Item).WithMany(p => p.CartItems)
                .HasForeignKey(d => d.Itemid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("cart_items_ibfk_2");
        });

        modelBuilder.Entity<ClientAccount>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("client_accounts");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.ChangedPasswordAt)
                .HasColumnType("datetime")
                .HasColumnName("changed_password_at");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(255)
                .HasColumnName("display_name");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        modelBuilder.Entity<ClientAddress>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("client_addresses");

            entity.HasIndex(e => e.Clientid, "clientid");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .HasColumnName("city");
            entity.Property(e => e.Clientid).HasColumnName("clientid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.IsDefault).HasColumnName("is_default");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .HasColumnName("phone_number");
            entity.Property(e => e.Province)
                .HasMaxLength(255)
                .HasColumnName("province");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Client).WithMany(p => p.ClientAddresses)
                .HasForeignKey(d => d.Clientid)
                .HasConstraintName("client_addresses_ibfk_1");
        });

        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("conversations");

            entity.HasIndex(e => e.Clientid, "clientid");

            entity.HasIndex(e => e.Staffid, "staffid");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Clientid).HasColumnName("clientid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Staffid).HasColumnName("staffid");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Client).WithMany(p => p.Conversations)
                .HasForeignKey(d => d.Clientid)
                .HasConstraintName("conversations_ibfk_1");

            entity.HasOne(d => d.Staff).WithMany(p => p.Conversations)
                .HasForeignKey(d => d.Staffid)
                .HasConstraintName("conversations_ibfk_2");
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("items");

            entity.HasIndex(e => e.Brandid, "brandid");

            entity.HasIndex(e => e.Categoryid, "categoryid");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Brandid).HasColumnName("brandid");
            entity.Property(e => e.Categoryid).HasColumnName("categoryid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Specification).HasColumnName("specification");
            entity.Property(e => e.StockQty).HasColumnName("stock_qty");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Brand).WithMany(p => p.Items)
                .HasForeignKey(d => d.Brandid)
                .HasConstraintName("items_ibfk_2");

            entity.HasOne(d => d.Category).WithMany(p => p.Items)
                .HasForeignKey(d => d.Categoryid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("items_ibfk_1");
        });

        modelBuilder.Entity<ItemCategory>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("item_categories");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<ItemImg>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("item_imgs");

            entity.HasIndex(e => e.Itemid, "itemid");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.IsPrimary).HasColumnName("is_primary");
            entity.Property(e => e.Itemid).HasColumnName("itemid");
            entity.Property(e => e.Link)
                .HasMaxLength(255)
                .HasColumnName("link");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Item).WithMany(p => p.ItemImgs)
                .HasForeignKey(d => d.Itemid)
                .HasConstraintName("item_imgs_ibfk_1");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("messages");

            entity.HasIndex(e => e.Conversationid, "conversationid");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Content)
                .HasMaxLength(255)
                .HasColumnName("content");
            entity.Property(e => e.Conversationid).HasColumnName("conversationid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Role)
                .HasMaxLength(255)
                .HasColumnName("role");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Conversation).WithMany(p => p.Messages)
                .HasForeignKey(d => d.Conversationid)
                .HasConstraintName("messages_ibfk_1");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.Clientid, "clientid");

            entity.HasIndex(e => e.PromotionCode, "promotion_code");

            entity.HasIndex(e => e.ShippingAddressid, "shipping_addressid");

            entity.HasIndex(e => e.SupportedBy, "supported_by");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Clientid).HasColumnName("clientid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.OrderDate)
                .HasColumnType("datetime")
                .HasColumnName("order_date");
            entity.Property(e => e.OrderStatus)
                .HasMaxLength(255)
                .HasColumnName("order_status");
            entity.Property(e => e.PaymentMethod)
                .HasMaxLength(255)
                .HasColumnName("payment_method");
            entity.Property(e => e.PromotionCode).HasColumnName("promotion_code");
            entity.Property(e => e.ReceiveMethod)
                .HasMaxLength(255)
                .HasColumnName("receive_method");
            entity.Property(e => e.ShippingAddressid).HasColumnName("shipping_addressid");
            entity.Property(e => e.SupportedBy).HasColumnName("supported_by");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Client).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Clientid)
                .HasConstraintName("orders_ibfk_1");

            entity.HasOne(d => d.PromotionCodeNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PromotionCode)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("orders_ibfk_3");

            entity.HasOne(d => d.ShippingAddress).WithMany(p => p.Orders)
                .HasForeignKey(d => d.ShippingAddressid)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("orders_ibfk_2");

            entity.HasOne(d => d.SupportedByNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.SupportedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("orders_ibfk_4");
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => new { e.Itemid, e.Orderid }).HasName("PRIMARY");

            entity.ToTable("order_items");

            entity.HasIndex(e => e.Orderid, "orderid");

            entity.Property(e => e.Itemid).HasColumnName("itemid");
            entity.Property(e => e.Orderid).HasColumnName("orderid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.NewPrice).HasColumnName("new_price");
            entity.Property(e => e.OldPrice).HasColumnName("old_price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Item).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.Itemid)
                .HasConstraintName("order_items_ibfk_1");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderItems)
                .HasForeignKey(d => d.Orderid)
                .HasConstraintName("order_items_ibfk_2");
        });

        modelBuilder.Entity<Post>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("posts");

            entity.HasIndex(e => e.CreatedBy, "created_by");

            entity.HasIndex(e => e.ParentPost, "parent_post");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.Depth).HasColumnName("depth");
            entity.Property(e => e.IsEdited).HasColumnName("is_edited");
            entity.Property(e => e.KeyWords)
                .HasMaxLength(255)
                .HasColumnName("key_words");
            entity.Property(e => e.ParentPost).HasColumnName("parent_post");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.Posts)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("posts_ibfk_1");

            entity.HasMany(p => p.ChildrenPosts).WithOne()
                .HasForeignKey(p => p.ParentPost)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("posts_ibfk_2");
        });

        modelBuilder.Entity<Promotion>(entity =>
        {
            entity.HasKey(e => e.Code).HasName("PRIMARY");

            entity.ToTable("promotions");

            entity.Property(e => e.Code).HasColumnName("code");
            entity.Property(e => e.Condition).HasColumnName("condition");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.DiscountRate).HasColumnName("discount_rate");
            entity.Property(e => e.EndDate)
                .HasColumnType("datetime")
                .HasColumnName("end_date");
            entity.Property(e => e.MaxDiscount).HasColumnName("max_discount");
            entity.Property(e => e.StartDate)
                .HasColumnType("datetime")
                .HasColumnName("start_date");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Vote>(entity =>
        {
            entity.HasKey(e => new { e.Postid, e.Clientid }).HasName("PRIMARY");

            entity.ToTable("votes");

            entity.HasIndex(e => e.Clientid, "clientid");

            entity.Property(e => e.Postid).HasColumnName("postid");
            entity.Property(e => e.Clientid).HasColumnName("clientid");
            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
            entity.Property(e => e.UpdatedAt)
                .HasColumnType("datetime")
                .HasColumnName("updated_at");

            entity.HasOne(d => d.Client).WithMany(p => p.Votes)
                .HasForeignKey(d => d.Clientid)
                .HasConstraintName("votes_ibfk_2");

            entity.HasOne(d => d.Post).WithMany(p => p.Votes)
                .HasForeignKey(d => d.Postid)
                .HasConstraintName("votes_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
