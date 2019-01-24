using classico.Models.Node;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Controllers.RP
{
    public interface INodeRepository
    {
        Task<IEnumerable<Node>> GetAllNodes();
        Task<Node> GetNode(string name);
        Task Insert(Node node);
        Task InsertMany(Node[] node);
        Task<bool> Replace(Node node);
        Task<bool> Update(Node node);
        Task<bool> Delete(string name);
    }
}
