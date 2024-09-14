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
            services.AddMvc();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins(_allowedDomain)
                    .WithMethods("GET", "POST")
                    .WithHeaders("content-type"));
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseMvc();
            app.UseCors("AllowSpecificOrigin");
        }
    }
}
