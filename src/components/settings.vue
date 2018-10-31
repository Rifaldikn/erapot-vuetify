<template>
    <div>
        <v-card>

            <v-expansion-panel>
                <v-expansion-panel-content>
                    <div slot="header" class="headline">Konfigurasi Sekolah</div>
                    <v-card>
                        <v-form v-model="valid">
                            <v-container>
                                <v-layout row wrap>
                                    <v-flex md6>
                                        <v-text-field v-model="name" label="Nama Sekolah" required>
                                        </v-text-field>
                                        <v-text-field v-model="name" label="NPSN/NSN" required>
                                        </v-text-field>
                                        <v-text-field v-model="name" label="Alamat" required>
                                        </v-text-field>
                                        <v-text-field v-model="name" label="Desa/Kelurahan" required>
                                        </v-text-field>
                                        <v-text-field md6 v-model="name" label="Kecamatan" required>
                                        </v-text-field>

                                    </v-flex>

                                    <v-flex md6>
                                        <v-text-field v-model="name" label="Provinsi" required>
                                        </v-text-field>
                                        <v-text-field v-model="name" label="Kabupaten/Kota" required>
                                        </v-text-field>

                                        <v-layout row wrap>
                                            <v-flex xs6 md5 mr-auto>
                                                <v-text-field v-model="name" label="Kode Pos" required>
                                                </v-text-field>
                                            </v-flex>
                                            <v-flex xs6 md5>
                                                <v-text-field v-model="name" label="Nomor Telepon" required>
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                        <v-text-field md6 v-model="name" label="Email" required>
                                        </v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-btn color="primary" @click="e1 = 2">
                                Save
                            </v-btn>
                            <v-btn flat @click="">Reset</v-btn>
                            <!-- </v-container> -->
                            <!-- </v-layout> -->
                        </v-form>
                    </v-card>
                </v-expansion-panel-content>
                <v-expansion-panel-content>
                    <div slot="header" class="headline">Konfigurasi Umum</div>
                    <v-card>
                        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
                    </v-card>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-card>
    </div>
</template>

<script>
    export default {

    }
</script>