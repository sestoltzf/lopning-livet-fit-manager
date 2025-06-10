import React, { useState, useRef } from 'react';
import { Download, FileText, Watch, Usb, CheckCircle, Trash2, Info, ChevronDown, ChevronRight } from 'lucide-react';

// FIT Library data - alla l&l träningspass
const fitLibrary = {
  backpass: [
    {
      id: 'back-1',
      name: 'Backpass 3x(60-45-30s)',
      filename: '__Backpass_3x(60-...0s)_workout (1) (1).fit',
      description: '3 serier med 60s, 45s, 30s uppför backe',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Backpass'
    },
    {
      id: 'back-2',
      name: 'Backpass 10x45s',
      filename: '__Backpass_10x45s_workout (1) (1).fit',
      description: '10 x 45 sekunder uppför backe',
      difficulty: 'Hög',
      duration: '40-50 min',
      type: 'Backpass'
    },
    {
      id: 'back-3',
      name: 'Backpass 4x60-45-30s',
      filename: 'Backpass_4x60-45-30s_workout (1).fit',
      description: '4 serier med 60s, 45s, 30s uppför backe',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Backpass'
    },
    {
      id: 'back-4',
      name: 'Backpass 10x60s under',
      filename: 'Backpass_10_x_60_...under_workout (1).fit',
      description: '10 x 60s uppför med jogg ner',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Backpass'
    },
    {
      id: 'back-5',
      name: 'Backpass 10x60s under (v2)',
      filename: 'Backpass_10_x_60_...under_workout (2).fit',
      description: '10 x 60s uppför med jogg ner - alternativ version',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Backpass'
    }
  ],
  fartlek: [
    {
      id: 'fartlek-1',
      name: 'Fartlek 1-2-3-4-4-3-2-1',
      filename: '__Fartlek_1-2-3-4-4-3-2-1_workout (1).fit',
      description: 'Pyramid-fartlek med uppbyggnad och nedtrappning',
      difficulty: 'Medel',
      duration: '50-65 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-2',
      name: 'Fartlek 2x3-2-1 min',
      filename: '__Fartlek_2x3-2-1_min_workout (1) (1).fit',
      description: '2 serier med 3-2-1 min intervaller',
      difficulty: 'Medel',
      duration: '45-55 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-3',
      name: 'Fartlek 4x4+2x2min',
      filename: '__Fartlek_4x4+2x2min_workout (1) (1).fit',
      description: '4x4min + 2x2min varierat tempo',
      difficulty: 'Hög',
      duration: '55-70 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-4',
      name: 'Fartlek 4x5min',
      filename: '__Fartlek_4x5min_workout (1).fit',
      description: '4 x 5 minuter i varierat tempo',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-5',
      name: 'Fartlek 5x60s...45',
      filename: '__Fartlek_5x60_60s...45_workout (1) (1).fit',
      description: '5 x 60s med 45s vila',
      difficulty: 'Medel',
      duration: '35-45 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-6',
      name: 'Fartlek 8-6-4-2 min',
      filename: '__Fartlek_8-6-4-2_min_workout (1).fit',
      description: 'Nedtrappning: 8-6-4-2 minuter',
      difficulty: 'Hög',
      duration: '60-75 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-7',
      name: 'Fartlek 2x6_2x4_2x2 min',
      filename: 'Fartlek_2x6_2x4_2x2_min_workout (2).fit',
      description: '2x6min + 2x4min + 2x2min',
      difficulty: 'Hög',
      duration: '65-80 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-8',
      name: 'Fartlek 5x2_-_5x1 min',
      filename: 'Fartlek_5x2_-_5x1_min_workout (1).fit',
      description: '5x2min + 5x1min intervaller',
      difficulty: 'Medel',
      duration: '45-60 min',
      type: 'Fartlek'
    },
    {
      id: 'fartlek-9',
      name: 'Fartlek 6-5-4-3-2-1 min',
      filename: 'Fartlek_6-5-4-3-2-1_min_workout (1).fit',
      description: 'Nedtrappning från 6 till 1 minut',
      difficulty: 'Hög',
      duration: '60-75 min',
      type: 'Fartlek'
    }
  ],
  fartpass: [
    {
      id: 'fart-1',
      name: 'Fartpass 2x6km',
      filename: '__Fartpass_2x6km_workout (1).fit',
      description: '2 x 6km i fartpass-tempo',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-2',
      name: 'Fartpass 3-2-3x1km',
      filename: '__Fartpass_3-2-3x1km_workout (1).fit',
      description: '3km + 2km + 3x1km i tempo',
      difficulty: 'Hög',
      duration: '65-80 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-3',
      name: 'Fartpass 3xSuper...ar',
      filename: '__Fartpass_3xSuper...ar_workout (1) (1).fit',
      description: '3 x Supersnabba repetitioner',
      difficulty: 'Hög',
      duration: '45-60 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-4',
      name: 'Fartpass 4x3km',
      filename: '__Fartpass_4x3km_workout (1).fit',
      description: '4 x 3km i fartpass-tempo',
      difficulty: 'Hög',
      duration: '80-95 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-5',
      name: 'Fartpass 5-4-3-2-1 km',
      filename: '__Fartpass_5-4-3-2-1_km_workout (1).fit',
      description: 'Pyramid nedåt: 5-4-3-2-1 km',
      difficulty: 'Hög',
      duration: '90-110 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-6',
      name: 'Fartpass 5k tempo',
      filename: '__Fartpass_5k_tempo_workout (1).fit',
      description: '5km i tempofart kontinuerligt',
      difficulty: 'Medel',
      duration: '45-60 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-7',
      name: 'Fartpass 10-8-6-4-2min',
      filename: '__Fartpass_10-8-6-4-2min_workout (1).fit',
      description: 'Nedtrappning: 10-8-6-4-2 minuter',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-8',
      name: 'Fartpass 15x200m',
      filename: '__Fartpass_15x200m_workout (2).fit',
      description: '15 x 200m på bana eller väg',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-9',
      name: 'Fartpass 15x400m',
      filename: '__Fartpass_15x400m_workout (1).fit',
      description: '15 x 400m repetitioner',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-10',
      name: 'Fartpass 30min...ressivt',
      filename: '__Fartpass_30min_...ressivt_workout (1).fit',
      description: '30 min progressivt tempo',
      difficulty: 'Medel',
      duration: '60-75 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-11',
      name: 'Fartpass 45min...ressivt',
      filename: '__Fartpass_45min_...ressivt_workout (1).fit',
      description: '45 min progressivt tempo',
      difficulty: 'Hög',
      duration: '75-90 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-12',
      name: 'Fartpass 3x3km',
      filename: 'Fartpass_3x3km_workout (1).fit',
      description: '3 x 3km i fartpass-tempo',
      difficulty: 'Hög',
      duration: '70-85 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-13',
      name: 'Fartpass 4x2km joggvila',
      filename: 'Fartpass_4x2km_joggvila_workout (1).fit',
      description: '4 x 2km med joggvila',
      difficulty: 'Medel',
      duration: '60-75 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-14',
      name: 'Fartpass 6x1km',
      filename: 'Fartpass_6x1km_workout (1).fit',
      description: '6 x 1km repetitioner',
      difficulty: 'Hög',
      duration: '55-70 min',
      type: 'Fartpass'
    },
    {
      id: 'fart-15',
      name: 'Fartpass 10x400m',
      filename: 'Fartpass_10x400m_workout (1).fit',
      description: '10 x 400m på bana',
      difficulty: 'Hög',
      duration: '50-65 min',
      type: 'Fartpass'
    }
  ],
  langpass: [
    {
      id: 'lang-1',
      name: 'Långpass 90-100min inkl.',
      filename: '__Långpass_90-100...inkl.__workout (1).fit',
      description: 'Långpass 90-100 minuter inklusive uppvärmning',
      difficulty: 'Medel',
      duration: '90-100 min',
      type: 'Långpass'
    }
  ],
  distans: [
    {
      id: 'dist-1',
      name: 'Distans 40-50min strides',
      filename: 'Distans_40-50min-strides_workout (1).fit',
      description: '40-50 min distanslöpning med strides',
      difficulty: 'Låg',
      duration: '40-50 min',
      type: 'Distans'
    }
  ],
  special: [
    {
      id: 'spec-1',
      name: '3 x 2 km jv',
      filename: '3_x_2_km_jv_workout (1).fit',
      description: '3 x 2km med joggvila',
      difficulty: 'Medel',
      duration: '50-65 min',
      type: 'Special'
    },
    {
      id: 'spec-2',
      name: 'Varvetspecial - spuring',
      filename: 'Varvetspecial_-_spu...ing_1_workout (1).fit',
      description: 'Specialpass för Göteborgsvarvet med spurt',
      difficulty: 'Hög',
      duration: '60-75 min',
      type: 'Special'
    }
  ]
};

// Hjälpfunktioner
const getAllWorkouts = () => {
  return Object.values(fitLibrary).flat();
};

const getWorkoutsByCategory = (category) => {
  return fitLibrary[category] || [];
};

const downloadFitFile = async (filename) => {
  try {
    const response = await fetch('/fit-files/' + filename);
    if (!response.ok) {
      throw new Error('Kunde inte ladda ' + filename);
    }
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Fel vid nedladdning:', error);
    alert('Kunde inte ladda ner filen. Kontrollera att den finns i public/fit-files/');
  }
};

const uploadToNetlify = async (file, description, author) => {
  const formData = new FormData();
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Content = btoa(
          new Uint8Array(reader.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const response = await fetch('/.netlify/functions/upload-fit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileName: file.name,
            fileContent: base64Content,
            description: description,
            author: author
          })
        });

        const result = await response.json();
        
        if (response.ok) {
          resolve(result);
        } else {
          reject(new Error(result.error || 'Upload misslyckades'));
        }
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Kunde inte läsa filen'));
    reader.readAsArrayBuffer(file);
  });
};
const GarminFitManager = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [fileType, setFileType] = useState('workout');
  const [expandedCategories, setExpandedCategories] = useState({});
  
  // Upload state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileUploadRef = useRef(null);

  const categories = {
    backpass: { name: 'Backpass', color: 'emerald', icon: '⛰️' },
    fartlek: { name: 'Fartlek', color: 'blue', icon: '🔄' },
    fartpass: { name: 'Fartpass', color: 'purple', icon: '⚡' },
    langpass: { name: 'Långpass', color: 'green', icon: '🏃‍♂️' },
    distans: { name: 'Distans', color: 'orange', icon: '📏' },
    special: { name: 'Special', color: 'red', icon: '⭐' }
  };

  const selectLibraryWorkout = (workout) => {
    const isAlreadySelected = selectedFiles.some(f => f.id === workout.id);
    if (isAlreadySelected) {
      setSelectedFiles(prev => prev.filter(f => f.id !== workout.id));
    } else {
      setSelectedFiles(prev => [...prev, { ...workout, selectedAt: new Date().toLocaleString('sv-SE') }]);
    }
  };

  const downloadSelectedFile = async (file) => {
    await downloadFitFile(file.filename);
  };

  const downloadAllSelected = async () => {
    for (const file of selectedFiles) {
      await downloadFitFile(file.filename);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== id));
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.name.toLowerCase().endsWith('.fit')) {
      setUploadFile(file);
      setUploadSuccess('');
    } else {
      alert('Vänligen välj en .fit fil');
      event.target.value = '';
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadDescription.trim() || !uploadAuthor.trim()) {
      alert('Vänligen fyll i alla fält');
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadToNetlify(uploadFile, uploadDescription.trim(), uploadAuthor.trim());
      setUploadSuccess(result.message);
      setUploadFile(null);
      setUploadDescription('');
      setUploadAuthor('');
      if (fileUploadRef.current) {
        fileUploadRef.current.value = '';
      }
    } catch (error) {
      alert('Upload misslyckades: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const clearUpload = () => {
    setUploadFile(null);
    setUploadDescription('');
    setUploadAuthor('');
    setUploadSuccess('');
    if (fileUploadRef.current) {
      fileUploadRef.current.value = '';
    }
  };

  const allSelectedFiles = selectedFiles;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-stone-50 min-h-screen">
      <div className="bg-gray-700 text-white p-8 rounded-2xl mb-8 shadow-lg" style={{background: 'linear-gradient(to right, #38705E, #456B60)'}}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Watch className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">löpning & livet</h1>
            <p className="text-lg" style={{color: '#F7F7ED'}}>FIT File Manager</p>
          </div>
        </div>
        <p className="leading-relaxed" style={{color: '#F7F7ED'}}>
          Anpassa löpning efter livet, inte tvärtom. Välj från l&l träningspass och överför enkelt till din Garmin-klocka.
        </p>
      </div>

      <div className="border rounded-2xl p-8 mb-8 shadow-sm" style={{backgroundColor: '#F7F7ED', borderColor: '#38705E'}}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{color: '#38705E'}}>
          <Info className="w-5 h-5" />
          Så här använder du FIT File Manager
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{color: '#38705E'}}>
          <div className="space-y-4">
            <h4 className="font-bold text-lg">📥 Hämta träningspass</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{backgroundColor: '#38705E'}}>1</div>
                <p className="text-sm">Välj träningspass från l&l bibliotek med {getAllWorkouts().length} pass</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{backgroundColor: '#38705E'}}>2</div>
                <p className="text-sm">Klicka "Ladda ner alla" eller välj individuella pass</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{backgroundColor: '#38705E'}}>3</div>
                <p className="text-sm">Anslut Garmin-klocka via USB och kopiera till GARMIN/workouts/ mappen</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{backgroundColor: '#38705E'}}>4</div>
                <p className="text-sm">Synka med Garmin Connect och hitta under: Träning → Träningspass</p>
              </div>
            </div>
          </div>
          <div className="border rounded-xl p-6" style={{backgroundColor: '#E6D5C7', borderColor: '#D67D65'}}>
            <h4 className="font-bold text-lg mb-4">🎯 Om träningspassen</h4>
            <div className="space-y-3 text-sm">
              <p>Alla pass är utformade enligt principen <strong>"anpassa löpning efter livet"</strong> med fokus på:</p>
              <ul className="space-y-1 ml-4">
                <li>• Hållbar utveckling och variation</li>
                <li>• Neutrala tempobeskrivningar (10K-fart, distansfart)</li>
                <li>• Flexibla tider för olika nivåer</li>
                <li>• Testade av l&l och löpgruppen</li>
              </ul>
              <div className="mt-4 p-3 rounded-lg" style={{backgroundColor: '#F7F7ED'}}>
                <p className="text-xs" style={{color: '#38705E'}}>
                  <strong>Tips:</strong> Passen beskriver tempo som "85-90% ansträngning" eller "10K-fart" istället för specifika tider, så de passar alla löpare!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-stone-800">Typ av FIT-fil</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="fileType"
              value="workout"
              checked={fileType === 'workout'}
              onChange={(e) => setFileType(e.target.value)}
              className="text-emerald-600"
            />
            <span className="font-medium text-stone-800">Träningspass</span>
            <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">→ GARMIN/workouts/</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="fileType"
              value="activity"
              checked={fileType === 'activity'}
              onChange={(e) => setFileType(e.target.value)}
              className="text-amber-600"
            />
            <span className="font-medium text-stone-800">Aktivitet/Rutt</span>
            <span className="text-sm text-stone-500 bg-stone-100 px-3 py-1 rounded-full">→ GARMIN/activities/</span>
          </label>
        </div>
      </div>

      {/* Community Upload Section */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-xl font-bold text-stone-800">Bidra till communityt</h3>
          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{backgroundColor: '#D67D65', color: 'white'}}>Community-driven</span>
        </div>
        <p className="text-stone-600 mb-6">
          Dela dina bästa träningspass med andra löpare i l&l communityt! Dina pass blir tillgängliga för alla inom några minuter.
        </p>
        
        {uploadSuccess && (
          <div className="mb-6 p-4 rounded-xl border" style={{backgroundColor: '#E6F5E6', borderColor: '#38705E'}}>
            <p style={{color: '#38705E'}} className="font-medium">✓ {uploadSuccess}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Välj FIT-fil *
              </label>
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors">
                <input
                  ref={fileUploadRef}
                  type="file"
                  accept=".fit"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {uploadFile ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="w-5 h-5" style={{color: '#38705E'}} />
                      <span className="font-medium text-stone-800">{uploadFile.name}</span>
                    </div>
                    <button
                      onClick={() => fileUploadRef.current?.click()}
                      className="text-sm text-stone-600 hover:text-stone-800"
                    >
                      Välj annan fil
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto" style={{backgroundColor: '#F7F7ED'}}>
                      <FileText className="w-6 h-6" style={{color: '#38705E'}} />
                    </div>
                    <button
                      onClick={() => fileUploadRef.current?.click()}
                      className="text-white px-4 py-2 rounded-lg font-medium hover:opacity-80 transition-colors"
                      style={{backgroundColor: '#38705E'}}
                    >
                      Välj FIT-fil
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Ditt namn *
              </label>
              <input
                type="text"
                value={uploadAuthor}
                onChange={(e) => setUploadAuthor(e.target.value)}
                placeholder="T.ex. Anna från Stockholm"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Beskrivning av passet *
              </label>
              <textarea
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="Beskriv vad passet innehåller, svårighetsgrad och tips för genomförande..."
                rows={4}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-stone-200">
          <div className="text-xs text-stone-500">
            * Obligatoriska fält. Ditt pass granskas och blir tillgängligt inom några minuter.
          </div>
          <div className="flex gap-3">
            {(uploadFile || uploadDescription || uploadAuthor) && (
              <button
                onClick={clearUpload}
                className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
                disabled={isUploading}
              >
                Rensa
              </button>
            )}
            <button
              onClick={handleUpload}
              disabled={!uploadFile || !uploadDescription.trim() || !uploadAuthor.trim() || isUploading}
              className="text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{backgroundColor: '#38705E'}}
            >
              {isUploading ? 'Laddar upp...' : 'Dela med communityt'}
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl" style={{backgroundColor: '#F7F7ED'}}>
          <h4 className="font-semibold mb-2" style={{color: '#38705E'}}>💡 Tips för bra community-pass:</h4>
          <ul className="text-sm space-y-1" style={{color: '#38705E'}}>
            <li>• Beskriv tydligt vad passet innehåller (t.ex. "5x1km i tempofart")</li>
            <li>• Ange ungefärlig svårighetsgrad och tidsåtgång</li>
            <li>• Lägg till tips för genomförande eller variation</li>
            <li>• Välj beskrivande filnamn</li>
          </ul>
        </div>
      </div>

      {fileType === 'workout' && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xl font-bold text-stone-800">l&l träningspass</h3>
            <span className="text-xs px-2 py-1 rounded-full font-medium" style={{backgroundColor: '#F7F7ED', color: '#38705E'}}>Expert-kurerade</span>
          </div>
          <p className="text-stone-600 mb-6">Välj från {getAllWorkouts().length} professionellt utformade träningspass:</p>
          
          <div className="space-y-3">
            {Object.entries(categories).map(([categoryKey, category]) => {
              const workouts = getWorkoutsByCategory(categoryKey);
              if (workouts.length === 0) return null;
              
              const isExpanded = expandedCategories[categoryKey];
              
              return (
                <div key={categoryKey} className="border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="w-full p-4 bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-semibold text-stone-800">{category.name}</span>
                      <span className="bg-stone-200 text-stone-700 text-xs px-2 py-1 rounded-full">
                        {workouts.length} pass
                      </span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                  
                  {isExpanded && (
                    <div className="p-2 space-y-2">
                      {workouts.map((workout) => {
                        const isSelected = selectedFiles.some(f => f.id === workout.id);
                        return (
                          <div
                            key={workout.id}
                            className={`p-3 rounded-lg border transition-all cursor-pointer ${
                              isSelected 
                                ? 'border-emerald-200 bg-emerald-50' 
                                : 'border-stone-200 hover:border-stone-300 bg-white'
                            }`}
                            onClick={() => selectLibraryWorkout(workout)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-stone-800 text-sm">{workout.name}</h4>
                                  <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">av l&l</span>
                                </div>
                                <p className="text-xs text-stone-600 mt-1">{workout.description}</p>
                                <div className="flex gap-2 mt-2">
                                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                    {workout.difficulty}
                                  </span>
                                  <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-600">
                                    {workout.duration}
                                  </span>
                                </div>
                              </div>
                              {isSelected && (
                                <CheckCircle className="w-5 h-5 text-emerald-600 ml-2" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center my-8">
        <h2 className="text-2xl font-bold text-stone-800">
          Klara för överföring ({allSelectedFiles.length})
        </h2>
        <div className="flex gap-4">
          {allSelectedFiles.length > 0 && (
            <button
              onClick={downloadAllSelected}
              className="flex items-center gap-2 text-white px-6 py-3 rounded-xl hover:opacity-80 transition-colors duration-200 font-medium shadow-sm"
              style={{backgroundColor: '#38705E'}}
            >
              <Download className="w-4 h-4" />
              Ladda ner alla ({allSelectedFiles.length})
            </button>
          )}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 bg-stone-600 text-white px-6 py-3 rounded-xl hover:bg-stone-700 transition-colors duration-200 font-medium shadow-sm"
          >
            <Info className="w-4 h-4" />
            {showInstructions ? 'Dölj' : 'Visa'} detaljerade instruktioner
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="border rounded-2xl p-8 mb-8 shadow-sm" style={{backgroundColor: '#E6F3FF', borderColor: '#64A0D6'}}>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{color: '#456B87'}}>
            <Usb className="w-5 h-5" />
            Detaljerade överföringsinstruktioner
          </h3>
          <div className="space-y-6" style={{color: '#456B87'}}>
            <div className="flex items-start gap-4">
              <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1" style={{backgroundColor: '#64A0D6'}}>1</div>
              <div>
                <p className="font-semibold text-lg">Anslut din Garmin-klocka</p>
                <p>Använd USB-kabeln och anslut till datorn. Öppna Garmin Express.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1" style={{backgroundColor: '#64A0D6'}}>2</div>
              <div>
                <p className="font-semibold text-lg">Ladda ner pass</p>
                <p>Klicka "Ladda ner alla" eller individuella filer nedan.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1" style={{backgroundColor: '#64A0D6'}}>3</div>
              <div>
                <p className="font-semibold text-lg">Kopiera till klockan</p>
                <p>Kopiera filerna till GARMIN/workouts/ mappen på klockan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1" style={{backgroundColor: '#64A0D6'}}>4</div>
              <div>
                <p className="font-semibold text-lg">Synka och träna</p>
                <p>Synka med Garmin Connect och hitta under: Träning → Träningspass</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {allSelectedFiles.length === 0 ? (
        <div className="text-center py-16 text-stone-500">
          <FileText className="w-20 h-20 mx-auto mb-6 text-stone-300" />
          <p className="text-xl mb-2">Inga filer valda än</p>
          <p className="text-stone-400">
            Välj träningspass från biblioteket ovan
          </p>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-stone-800 mb-6">Valda filer att överföra</h3>
          <div className="space-y-3">
            {allSelectedFiles.map((file) => (
              <div key={file.id} className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{backgroundColor: '#E6F5E6'}}>
                      <FileText className="w-5 h-5" style={{color: '#38705E'}} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-stone-800">{file.name || file.filename}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-stone-100 text-stone-700">
                          av l&l
                        </span>
                      </div>
                      <p className="text-sm text-stone-600">
                        {file.description}
                      </p>
                      {file.duration && (
                        <p className="text-xs text-stone-500 mt-1">{file.duration}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadSelectedFile(file)}
                      className="flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:opacity-80 transition-colors text-sm font-medium"
                      style={{backgroundColor: '#38705E'}}
                    >
                      <Download className="w-4 h-4" />
                      Ladda ner
                    </button>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 pt-8 border-t border-stone-200 text-center text-stone-500">
        <p className="text-sm">
          Stöder alla Garmin-klockor som accepterar FIT-filer via USB-anslutning • 
          <span className="font-medium"> Gå med i löpgruppen på Discord för mer community-innehåll</span>
        </p>
      </div>
    </div>
  );
};

export default GarminFitManager;