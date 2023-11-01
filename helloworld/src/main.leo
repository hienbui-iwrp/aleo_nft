// The 'leo_nft' program.
program leo_nft_fctc.aleo {
   
    // base uri ascii bits. Include as many data pieces as necessary to encapsulate the uri. Padded with 0s at the end.
    struct BaseURI {
        data0: u128, // Part 1 of the base uri in bits. Bits should be the representation of the hexadecimal bytes for the ASCII text of the URL
        data1: u128,
        data2: u128,
        data3: u128
    }

    struct SymbolBits {
        data: u128 // The sybmol's ascii text represented in bits, and the u128 value of the bitstring.
    }

    struct NameBits {
        data: u128 // The sybmol's ascii text represented in bits, and the u128 value of the bitstring.
    }

    record NFT {
        private owner: address,
        private token_id: u128,
        
    }
    // 0: initialized
    // 1: total - 
    // 2: name -
    // 3: symbol -
    // 4-7: uri-
    // 8: current
    mapping settings: u8 => u128;
    mapping nftOwner: u128 => address;

    transition initialize_collection(
        public total: u128,
        public name: u128,
        public symbol: u128,
        public base_uri: BaseURI,
    ) {
       
        return then finalize(total, symbol,name, base_uri);
    }

    finalize initialize_collection(
        public total: u128,
        public symbol: u128,
        public name: u128,
        public base_uri: BaseURI,
    ) {
        // Ensure initialize cannot be called twice!
        let is_initialized: u128 = settings.get_or_use(0u8, 0u128);
        assert_eq(is_initialized, 0u128); 

        settings.set(0u8, 1u128); // Collection has been initialized
        settings.set(1u8, total); // Number of total NFTs (first-editions) that can be minted
        settings.set(2u8, name); // Name
        settings.set(3u8, symbol); // Symbol for the NFT
        settings.set(4u8, base_uri.data0); // Base URI for NFT
        settings.set(5u8, base_uri.data1);
        settings.set(6u8, base_uri.data2);
        settings.set(7u8, base_uri.data3);
        settings.set(8u8, 1u128);
    }
    

 
    transition mint(public token_id: u128, public edition: scalar) -> NFT {
        return NFT {
            owner: self.caller,
            token_id: token_id,
        } then finalize(self.caller, token_id);
    }

    finalize mint(public owner: address, public  token_id: u128) {
        let current:u128 = settings.get(8u8);
        settings.set(1u8,1u128+current);
        nftOwner.set(token_id,owner);
    }


}
