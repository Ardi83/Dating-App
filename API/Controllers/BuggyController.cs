using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BuggyController : BaseApiController
  {
      private readonly DataContext _context;
    public BuggyController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetSecret()
    {
      return "Secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
      var userExist = _context.Users.Find(-1);
      if (userExist == null) return NotFound();
      return Ok(userExist);
    }

    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {
      var userExist = _context.Users.Find(-1);
      var userExistToString = userExist.ToString();
      return userExistToString;
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
      return BadRequest("This was not a good request!");
    }
  }
}