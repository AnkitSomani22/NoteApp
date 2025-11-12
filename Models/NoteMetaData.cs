public class NoteMetadata
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public Priority Priority { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
