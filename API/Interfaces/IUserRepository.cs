using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<bool> SaveAllAsync();

        Task<IEnumerable<MemberDto>> GetMembersAsync();

        Task<MemberDto> GetMemberByIdAsync(int id);

        Task<MemberDto> GetMemberAsync(string username);
    }
}