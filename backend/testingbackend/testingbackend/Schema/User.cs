using MongoDB.Bson;

namespace testingbackend.Schema;


public class User
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
}