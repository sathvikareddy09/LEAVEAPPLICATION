using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LEAVEAPPLICATION.Models;
using System.Text.Json.Serialization;
using System.Text.Json;

namespace LEAVEAPPLICATION.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly LeaveApplicationContext _context;

        public LeavesController(LeaveApplicationContext context)
        {
            _context = context;
        }

        // GET: api/Leaves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leaves>>> GetLeaves()
        {
            return await _context.Leaves.ToListAsync();
        }

        // GET: api/Leaves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Leaves>>> GetLeaves(int id)
        {
            var leaves = await _context.Leaves.Where(lr=>lr.EmployeeId == id).ToListAsync();

            if (leaves == null)
            {
                return NotFound();
            }

            return leaves;
        }


 

[HttpGet("/Lev/{LeaveId}")]
    public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeDetailsByLeaveId(int LeaveId)
    {
        var leave = await _context.Leaves.FindAsync(LeaveId);
        if (leave == null)
        {
            return NotFound("Leave not found.");
        }

        var options = new JsonSerializerOptions
        {
            ReferenceHandler = ReferenceHandler.Preserve,
            // Add any other serialization options you need
        };

        var employeeDetailsJson = JsonSerializer.Serialize(leave, options);

        return Ok(employeeDetailsJson);
    }




    // PUT: api/Leaves/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaves(int id, Leaves leaves)
        {
            if (id != leaves.LeaveId)
            {
                return BadRequest();
            }

            _context.Entry(leaves).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeavesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Leaves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Leaves>> PostLeaf(Leaves leaves)
        {
            _context.Leaves.Add(leaves);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeaves", new { id = leaves.LeaveId }, leaves);
        }

        // DELETE: api/Leaves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaves(int id)
        {
            var leaves = await _context.Leaves.FindAsync(id);
            if (leaves == null)
            {
                return NotFound();
            }

            _context.Leaves.Remove(leaves);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LeavesExists(int id)
        {
            return _context.Leaves.Any(e => e.LeaveId == id);
        }
    }
}
