using Microsoft.EntityFrameworkCore.Migrations;

namespace classico.Migrations
{
    public partial class applicationDbContextMigration101 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserLink",
                table: "Customers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserLink",
                table: "Customers");
        }
    }
}
