import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
    // Initialize the access control state
    let accessControlState = AccessControl.initState();
    include MixinAuthorization(accessControlState);
    include MixinStorage();

    public type UserProfile = {
        name : Text;
        // additional metadata if you want
    };

    type Data = {
        id : Text;
        blob : Storage.ExternalBlob;
        name : Text;
        // additional metadata for file management
    };

    let userProfiles = Map.empty<Principal, UserProfile>();

    public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only users can save profiles");
        };
        userProfiles.get(caller);
    };

    public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
        if (caller != user and not (AccessControl.isAdmin(accessControlState, caller))) {
            Runtime.trap("Unauthorized: Can only view your own profile");
        };
        userProfiles.get(user);
    };

    public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
        if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
            Runtime.trap("Unauthorized: Only users can save profiles");
        };
        userProfiles.add(caller, profile);
    };

    // Place your project-specific types and methods below
};
