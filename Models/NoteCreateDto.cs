public class NoteCreateDto
{
    public required string Title { get; set; }
    public string? Content { get; set; }
    public Priority Priority { get; set; } = Priority.Medium;
}
