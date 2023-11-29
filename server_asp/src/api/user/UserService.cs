using shieldtify.common;
using shieldtify.models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
namespace shieldtify.api.user
{
    public static class UserService
    {
        public static APIRes getAddresses(string clientid)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var addresses = db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid).ToList();
                return new APIRes(200, "Get addresses successfully", addresses);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static APIRes createAddress(string clientid, CreateAddressBody body)
        {
            try
            {
                using var db = new ShieldtifyContext();
                var allAddress = db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid).ToList();
                var newAddress = new ClientAddress
                {
                    Uid = Guid.NewGuid(),
                    Clientid = Guid.Parse(clientid),
                    Address = body.address,
                    City = body.city,
                    Province = body.province,
                    PhoneNumber = body.phone_number,
                    IsDefault = allAddress.Count == 0 ? true : body.is_default,
                };
                db.ClientAddresses.Add(newAddress);
                db.SaveChanges();
                if (allAddress.Count != 0 && body.is_default)
                {
                    db.ClientAddresses.Where(x => x.Clientid.ToString() == clientid && x.Uid != newAddress.Uid).ToList().ForEach(x => x.IsDefault = false);
                    db.SaveChanges();
                }
                return new APIRes(200, "Create address successfully", newAddress);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}