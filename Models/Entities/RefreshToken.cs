using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Models.Entities
{
    public class RefreshToken
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        [Required]
        public int RefreshTokenId { get; set; }

        [StringLength(50)]
        [Required]
        public string UserId { get; set; }

        [StringLength(500)]
        [Required]
        public string RefToken { get; set; }

        [Required]
        public DateTime Expiration { get; set; }

    }
}
