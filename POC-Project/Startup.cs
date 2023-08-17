using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using POC_Project.Mapper;
using POC_Project.Models;
using POC_Project.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POC_Project
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<ContactManagementContext>(options => options.UseSqlServer("Data Source=PVADDORIYA01;Initial Catalog=ContactManagement;Integrated Security=True;TrustServerCertificate=True"));
            services.AddDbContext<ContactManagementContext>(options => options.UseSqlServer("Server=tcp:pocserver369.database.windows.net,1433;Initial Catalog=ContactManagement;Persist Security Info=False;User ID=admin_prashant;Password=Saint@369;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"));

            services.AddControllers();
            services.AddScoped<IContactRepository, ContactRepository>();
         //   services.AddScoped<I>
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Contact Management API",
                    Version = "v1",
                    Description = "Your API Description"
                });
            });
            services.AddCors();
            var mapperConfig = new MapperConfiguration(mc => {
                mc.AddProfile(new ContactProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseCors(builder =>
            {
                builder.WithOrigins("http://localhost:4200", "https://poc-dotnet.azurewebsites.net", "https://lively-wave-00bc3ad10.3.azurestaticapps.net/").AllowAnyMethod().AllowAnyHeader();
                //builder
                //.AllowAnyOrigin()
                //.AllowAnyMethod()
                //.AllowAnyHeader();
            });

            app.UseRouting();
            app.UseSwagger();   
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Your API V1");
            });
            app.UseAuthorization();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }
    }
}
