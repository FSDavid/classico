using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace classico.Models.Node
{
    public class Node
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("context")]
        public string Context { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }
    }
}
