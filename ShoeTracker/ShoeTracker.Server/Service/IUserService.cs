﻿using ShoeTracker.Server.Models.Request;

namespace ShoeTracker.Server.Service
{
    public interface IUserService
    {
        Task CreateUserAsync(string id, CreateAccountDto accountDto);
        Task<GetUserDto> GetUserAsync(string id);
    }
}
