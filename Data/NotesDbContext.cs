using Microsoft.EntityFrameworkCore;

public class NotesDbContext : DbContext
{
    public DbSet<NoteMetadata> NoteMetadata { get; set; }
    public DbSet<NoteContent> NoteContent { get; set; }

    public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<NoteMetadata>()
            .HasOne<NoteContent>()
            .WithOne()
            .HasForeignKey<NoteContent>(c => c.Id)  
            .OnDelete(DeleteBehavior.Cascade);      
    }
}
