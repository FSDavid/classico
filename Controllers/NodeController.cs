using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using classico.Controllers.RP;
using classico.Models.Node;
using Microsoft.AspNetCore.Mvc;

namespace classico.Controllers
{
    [Route("api/[controller]")]
    public class NodeController : Controller
    {
        private readonly INodeRepository _nodeRepository;
        public NodeController(INodeRepository nodeRepository)
        {
            _nodeRepository = nodeRepository;
        }
   
        [HttpGet("getallnodes")]
        public async Task<IActionResult> Get()
        {
            return new ObjectResult(await _nodeRepository.GetAllNodes());
        }

        [HttpGet("getonenode")]
        public async Task<IActionResult> Get(string name)
        {
            var node = await _nodeRepository.GetNode(name);
            if (node == null)
                return new NotFoundResult();
            return new ObjectResult(node);
        }

        [HttpPost("postnode")]
        public async Task<IActionResult> Post([FromBody]Node node)
        {
            await _nodeRepository.Insert(node);
            return new OkObjectResult(node);
        }

        [HttpPut("updatenode")]
        public async Task<IActionResult> Put(string name, [FromBody]Node node)
        {
            var nodeFromDb = await _nodeRepository.GetNode(name);
            if (nodeFromDb == null)
                return new NotFoundResult();
            node.Id = nodeFromDb.Id;
            await _nodeRepository.Update(node);
            return new OkObjectResult(node);
        }

        [HttpDelete("deletenode")]
        public async Task<IActionResult> Delete(string name)
        {
            var nodeFromDb = await _nodeRepository.GetNode(name);
            if (nodeFromDb == null)
                return new NotFoundResult();
            await _nodeRepository.Delete(name);
            return new OkResult();
        }
    }
}