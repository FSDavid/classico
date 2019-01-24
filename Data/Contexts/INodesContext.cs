using classico.Models.Node;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Data.Contexts
{
    public interface INodesContext
    {
        IMongoCollection<Node> Nodes { get; }
    }
}
