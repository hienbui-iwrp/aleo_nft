program leo_nft_fctc.aleo;

struct BaseURI:
    data0 as u128;
    data1 as u128;
    data2 as u128;
    data3 as u128;

struct SymbolBits:
    data as u128;

struct NameBits:
    data as u128;

record NFT:
    owner as address.private;
    token_id as u128.private;


mapping settings:
	key as u8.public;
	value as u128.public;


mapping nftOwner:
	key as u128.public;
	value as address.public;

function initialize_collection:
    input r0 as u128.public;
    input r1 as u128.public;
    input r2 as u128.public;
    input r3 as BaseURI.public;
    async initialize_collection r0 r2 r1 r3 into r4;
    output r4 as leo_nft_fctc.aleo/initialize_collection.future;

finalize initialize_collection:
    input r0 as u128.public;
    input r1 as u128.public;
    input r2 as u128.public;
    input r3 as BaseURI.public;
    get.or_use settings[0u8] 0u128 into r4;
    assert.eq r4 0u128;
    set 1u128 into settings[0u8];
    set r0 into settings[1u8];
    set r2 into settings[2u8];
    set r1 into settings[3u8];
    set r3.data0 into settings[4u8];
    set r3.data1 into settings[5u8];
    set r3.data2 into settings[6u8];
    set r3.data3 into settings[7u8];
    set 1u128 into settings[8u8];


function mint:
    input r0 as u128.public;
    input r1 as scalar.public;
    cast self.caller r0 into r2 as NFT.record;
    async mint self.caller r0 into r3;
    output r2 as NFT.record;
    output r3 as leo_nft_fctc.aleo/mint.future;

finalize mint:
    input r0 as address.public;
    input r1 as u128.public;
    get settings[8u8] into r2;
    add 1u128 r2 into r3;
    set r3 into settings[1u8];
    set r0 into nftOwner[r1];
