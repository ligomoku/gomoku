using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace GomokuAPI
{
    public class Startup
    {
        private const string _allowedDomain = "http://localhost:4200";

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(_allowedDomain)
                        .WithOrigins("https://gomoku-gi8o.onrender.com") // ToDo: put this in global env's to pass to client and server to have single source of truth
                        .WithMethods("GET", "POST")
                        .WithHeaders("content-type"));
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseCors("AllowSpecificOrigin");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
