using Dapper;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Models.DTOs;
using System.Data;

namespace Server.Controllers
{
    public static class ProductsController
    {
        public static void MapProductEndpoints(this WebApplication app)
        {
            // Get all products
            app.MapGet("/products", async (IDbConnection connection) =>
            {
                var query = @"
                    SELECT p.*, pi.FileName as ImageFileName
                    FROM Products p
                    LEFT JOIN (
                        SELECT ProductId, FileName, MIN(Id) as MinId
                        FROM ProductImages
                        GROUP BY ProductId
                    ) as FirstImages ON p.Id = FirstImages.ProductId
                    LEFT JOIN ProductImages pi ON FirstImages.ProductId = pi.ProductId AND FirstImages.MinId = pi.Id";

                var productDict = new Dictionary<int, ProductListResponse>();
                
                await connection.QueryAsync<Product, string, ProductListResponse>(
                    query,
                    (product, imageFileName) =>
                    {
                        if (!productDict.TryGetValue(product.Id, out var productResponse))
                        {
                            productResponse = new ProductListResponse
                            {
                                Id = product.Id,
                                Title = product.Title,
                                Description = product.Description,
                                Price = product.Price,
                                Category = product.Category,
                                Image = imageFileName != null ? $"/images/{imageFileName}" : null
                            };
                            productDict.Add(product.Id, productResponse);
                        }
                        return productResponse;
                    },
                    splitOn: "ImageFileName"
                );
                
                return Results.Ok(productDict.Values);
            });

            // Get product by ID
            app.MapGet("/product/{id}", async (int id, IDbConnection connection) =>
            {
                // Get the product
                var product = await connection.QueryFirstOrDefaultAsync<Product>(
                    "SELECT * FROM Products WHERE Id = @Id", new { Id = id });
                
                if (product == null)
                {
                    return Results.NotFound();
                }
                
                // Get all images for the product
                var images = await connection.QueryAsync<string>(
                    "SELECT FileName FROM ProductImages WHERE ProductId = @ProductId",
                    new { ProductId = id });
                
                var response = new ProductDetailResponse
                {
                    Id = product.Id,
                    Title = product.Title,
                    Description = product.Description,
                    Price = product.Price,
                    Category = product.Category,
                    Images = images.Select(img => $"/images/{img}").ToList()
                };
                
                return Results.Ok(response);
            });
        }
    }
}