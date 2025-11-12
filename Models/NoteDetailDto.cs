public class NoteDetailDto
{
    public required int Id { get; set; }
    public required string Title { get; set; }
    public Priority Priority { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public string? Content { get; set; }
}
