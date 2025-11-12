using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesDbContext _context;

    public NotesController(NotesDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetNotes()
    {
        var notes = await _context.NoteMetadata.ToListAsync();
        return Ok(notes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetNote(int id)
    {
        var metadata = await _context.NoteMetadata.FirstOrDefaultAsync(m => m.Id == id);
        if (metadata == null) return NotFound();

        var content = await _context.NoteContent.FirstOrDefaultAsync(c => c.Id == id);

        var detail = new NoteDetailDto
        {
            Id = metadata.Id,
            Title = metadata.Title,
            Priority = metadata.Priority,
            CreatedAt = metadata.CreatedAt,
            UpdatedAt = metadata.UpdatedAt,
            Content = content?.Content
        };

        return Ok(detail);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNote(int id)
    {
        var metadata = await _context.NoteMetadata.FirstOrDefaultAsync(m => m.Id == id);
        if (metadata == null) return NotFound();

        _context.NoteMetadata.Remove(metadata);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> CreateNote([FromBody] NoteCreateDto noteData)
    {
        var newMetadata = new NoteMetadata
        {
            Title = noteData.Title,
            Priority = noteData.Priority,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        _context.NoteMetadata.Add(newMetadata);
        await _context.SaveChangesAsync();

        var newContent = new NoteContent
        {
            Id = newMetadata.Id,
            Content = noteData.Content ?? string.Empty
        };
        _context.NoteContent.Add(newContent);
        await _context.SaveChangesAsync();

        var detail = new NoteDetailDto
        {
            Id = newMetadata.Id,
            Title = newMetadata.Title,
            Priority = newMetadata.Priority,
            CreatedAt = newMetadata.CreatedAt,
            UpdatedAt = newMetadata.UpdatedAt,
            Content = newContent.Content
        };

        return Ok(detail);
    }

    [HttpPut("{id}/content")]
    public async Task<IActionResult> UpdateNoteContent(int id, [FromBody] NoteContentUpdateDto updatedContent)
    {
        var metadata = await _context.NoteMetadata.FirstOrDefaultAsync(m => m.Id == id);
        if (metadata == null) return NotFound();

        var content = await _context.NoteContent.FirstOrDefaultAsync(c => c.Id == id);

        if (content == null) return NotFound();
        
        content.Content = updatedContent.Content ?? string.Empty;
        metadata.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var result = new NoteDetailDto
        {
            Id = metadata.Id,
            Title = metadata.Title,
            Priority = metadata.Priority,
            CreatedAt = metadata.CreatedAt,
            UpdatedAt = metadata.UpdatedAt,
            Content = content?.Content
        };

        return Ok(result);
    }

    [HttpPut("{id}/metadata")]
    public async Task<IActionResult> UpdateNoteMetadata(int id, [FromBody] NoteMetadataUpdateDto updatedMetadata)
    {
        var metadata = await _context.NoteMetadata.FirstOrDefaultAsync(m => m.Id == id);
        if (metadata == null) return NotFound();

        metadata.Title = updatedMetadata.Title;
        metadata.Priority = (Priority)updatedMetadata.Priority;
        metadata.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var result = new NoteMetadata
        {
            Id = metadata.Id,
            Title = metadata.Title,
            Priority = metadata.Priority,
            CreatedAt = metadata.CreatedAt,
            UpdatedAt = metadata.UpdatedAt,
        };

        return Ok(result);
    }
}