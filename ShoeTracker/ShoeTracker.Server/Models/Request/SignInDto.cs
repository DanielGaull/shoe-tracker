﻿namespace ShoeTracker.Server.Models.Request
{
    public class SignInDto
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
