using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace GomokuAPI
{
    public class Startup
    {
        private const string _allowedVercelDomain = "https://gomoku-ruddy.vercel.app";
        private const string _allowedRenderDomain = "https://gomoku-gi8o.onrender.com"; // Optional: for server-to-server requests if needed.

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                {
                    builder
                        .WithOrigins(_allowedVercelDomain)
                        .WithMethods("GET", "POST", "PUT", "DELETE")
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors("AllowSpecificOrigin");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
