using System;
using System.Collections.Generic;

namespace LEAVEAPPLICATION.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string? EmployeeName { get; set; }

    public string? EmployeeEmailAddress { get; set; }

    public string? ManagerEmailAddress { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Leaves> Leaves { get; set; } = new List<Leaves>();
}
