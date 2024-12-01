//using System.Collections.Immutable;
//using System.Linq;
//using Microsoft.CodeAnalysis;
//using Microsoft.CodeAnalysis.CSharp;
//using Microsoft.CodeAnalysis.CSharp.Syntax;
//using Microsoft.CodeAnalysis.Diagnostics;

//namespace GomokuServer.Analyzer;

//[DiagnosticAnalyzer(LanguageNames.CSharp)]
//public class CommandsAndQueriesOrderAnalyzer : DiagnosticAnalyzer
//{
//    private static readonly DiagnosticDescriptor ClassOrderRule = new DiagnosticDescriptor(
//        id: "GOMOKU003",
//        title: "Ensure class order in Commands and Queries folders",
//        messageFormat: "File '{0}' should define classes in the following order: Request class, Handler class.",
//        category: "Structure",
//        defaultSeverity: DiagnosticSeverity.Warning,
//        isEnabledByDefault: true,
//        description: "Ensure the correct class ordering in Commands and Queries folders.");

//    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
//        => ImmutableArray.Create(ClassOrderRule);

//    public override void Initialize(AnalysisContext context)
//    {
//        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
//        context.EnableConcurrentExecution();

//        // Analyze syntax trees to inspect folder structure and class ordering
//        context.RegisterSyntaxTreeAction(AnalyzeSyntaxTree);
//    }

//    private static void AnalyzeSyntaxTree(SyntaxTreeAnalysisContext context)
//    {
//        // Get the file path
//        var filePath = context.Tree.FilePath;

//        // Check if the file is in a Commands or Queries folder
//        if (!filePath.Contains("\\Commands\\") && !filePath.Contains("\\Queries\\"))
//        {
//            return;
//        }

//        // Parse the syntax tree to get class declarations
//        var root = context.Tree.GetCompilationUnitRoot(context.CancellationToken);
//        var classDeclarations = root.DescendantNodes()
//                                    .OfType<ClassDeclarationSyntax>()
//                                    .ToList();

//        // Ensure at least two classes are present for the rule to apply
//        if (classDeclarations.Count < 2)
//        {
//            return;
//        }

//        // Extract class names
//        var classNames = classDeclarations.Select(cls => cls.Identifier.Text).ToList();

//        // Define expected order: "Request class first, Handler class second"
//        bool isCorrectOrder = (classNames[0].EndsWith("Command") || classNames[0].EndsWith("Query")) && classNames[1].EndsWith("Handler");

//        //if (!isCorrectOrder)
//        //{
//        // Report a diagnostic if the order is incorrect
//        var diagnostic = Diagnostic.Create(
//            ClassOrderRule,
//            classDeclarations[0].GetLocation(),
//            context.Tree.FilePath);

//        context.ReportDiagnostic(diagnostic);
//        //}
//    }
//}
