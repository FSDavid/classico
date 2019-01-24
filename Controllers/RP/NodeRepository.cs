using classico.Data.Contexts;
using classico.Models.Node;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Controllers.RP
{
    public class NodeRepository: INodeRepository
    {
        private readonly INodesContext _context;
        public NodeRepository(INodesContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Node>> GetAllNodes()
        {
            return await _context
                            .Nodes
                            .Find(_ => true)
                            .ToListAsync();
        }

        public Task<Node> GetNode(string name)
        {
            FilterDefinition<Node> filter = Builders<Node>.Filter.Eq(m => m.Name, name);
            return _context
                    .Nodes
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }

        public async Task Insert(Node node)
        {
            await _context.Nodes.InsertOneAsync(node);
        }
        public async Task InsertMany(Node[] node)
        {
            await _context.Nodes.InsertManyAsync(node);
        }

        public async Task<bool> Replace(Node node)
        {
            ReplaceOneResult replaceResult =
                await _context
                        .Nodes
                        .ReplaceOneAsync(
                            filter: g => g.Id == node.Id,
                            replacement: node);
            return replaceResult.IsAcknowledged
                    && replaceResult.ModifiedCount > 0;
        }

        public async Task<bool> Update(Node node)
        {
            //var id = new ObjectId(node.Id.ToString());

            //node.Id = null;

            var filter = new BsonDocument("_id", node.Id);
            var update = new BsonDocument("$set", new BsonDocument(node.ToBsonDocument()));

            var result = await _context.Nodes.UpdateOneAsync(filter, update);

            //var result = await _context.Nodes.UpdateOneAsync(filter: f => f.Id == node.Id, update);

            return result.IsAcknowledged && result.ModifiedCount>0;

            //UpdateResult updateResult =
            //    await _context.Nodes.UpdateOneAsync(
            //        filter: g => g.Id == node.Id,
            //        update: upddoc
            //        );

            //return updateResult.IsAcknowledged
            //        && updateResult.ModifiedCount > 0;
        }
        public async Task<bool> Delete(string name)
        {
            FilterDefinition<Node> filter = Builders<Node>.Filter.Eq(m => m.Name, name);
            DeleteResult deleteResult = await _context
                                                .Nodes
                                                .DeleteOneAsync(filter);
            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }
    }
}
