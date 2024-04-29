using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LEAVEAPPLICATION.Models;

public partial class LeaveApplicationContext : DbContext
{
    public LeaveApplicationContext()
    {
    }

    public LeaveApplicationContext(DbContextOptions<LeaveApplicationContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Leaves> Leaves { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Data Source=DESKTOP-TH\\SQLEXPRESS;database=LeaveApplication;Integrated Security=True; Trust Server Certificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__7AD04FF1231DC14C");

            entity.HasIndex(e => e.EmployeeEmailAddress, "UQ__Employee__EA4E01BAE951FEE9").IsUnique();

            entity.Property(e => e.EmployeeId)
                .ValueGeneratedNever()
                .HasColumnName("EmployeeID");
            entity.Property(e => e.EmployeeEmailAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.EmployeeName)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ManagerEmailAddress)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Password).HasMaxLength(50);
        });

        modelBuilder.Entity<Leaves>(entity =>
        {
            entity.HasKey(e => e.LeaveId).HasName("PK__Leaves__796DB979F4F09953");

            entity.Property(e => e.LeaveId).HasColumnName("LeaveID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.LeaveEndDate).HasColumnType("datetime");
            entity.Property(e => e.LeaveStartDate).HasColumnType("datetime");
            entity.Property(e => e.ReasonForLeave)
                .HasMaxLength(1000)
                .IsUnicode(false);
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TotalDays).HasComputedColumnSql("(case when CONVERT([date],[LeaveStartDate])=CONVERT([date],[LeaveEndDate]) then (1) else datediff(day,[LeaveStartDate],[LeaveEndDate])+(1) end)", false);

            entity.HasOne(d => d.Employee).WithMany(p => p.Leaves)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__Leaves__Employee__44952D46");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
