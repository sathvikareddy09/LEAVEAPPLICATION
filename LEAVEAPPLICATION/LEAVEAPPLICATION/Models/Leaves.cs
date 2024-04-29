using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LEAVEAPPLICATION.Models;

public partial class Leaves
{
    [Key]
    public int LeaveId { get; set; }

    public int? EmployeeId { get; set; }

    public DateTime? LeaveStartDate { get; set; }

    public DateTime? LeaveEndDate { get; set; }

    public string? ReasonForLeave { get; set; }

    public int? TotalDays { get; set; }

    public string? Status { get; set; }

    public virtual Employee? Employee { get; set; }
}
